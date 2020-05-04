import {Injectable} from '@angular/core';
import {Layout, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restURL + '/api/rooms')
      .pipe(
        map(
          data => {
            const rooms = new Array<Room>();
            for (const room of data) {
              rooms.push(Room.fromHttp(room));
            }
            return rooms;
          }
        )
      );
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restURL + '/api/users')
      .pipe(
        map(
          data => {
            const users = new Array<User>();
            for (const user of data) {
              users.push(User.fromHttp(user));
            }
            return users;
          }
        )
      );
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return of(null);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restURL + '/api/users', user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, password: password};
    return this.http.post<User>(environment.restURL + '/api/users', fullUser);
  }

  getCorrectedRoom(room: Room) {
    const correctedRoom = {id: room.id, name: room.name, location: room.location, capacities: []};
    for (const lc of room.capacities) {

      let correctLayout;
      for (let member in Layout) {
        if (Layout[member] === lc.layout) {
          correctLayout = member;
        }
      }

      const correctedLayout = {layout: correctLayout, capacity: lc.capacity};
      correctedRoom.capacities.push(correctedLayout);
    }
    return correctedRoom;
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(environment.restURL + '/api/rooms', this.getCorrectedRoom(room));
  }

  addRoom(newRoom: Room): Observable<Room> {
    return this.http.post<Room>(environment.restURL + '/api/rooms', this.getCorrectedRoom(newRoom));
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(environment.restURL + '/api/rooms/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restURL + '/api/users/' + id);
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restURL + '/api/users/resetPassword/' + id);
  }

  getBooking(id: number): Observable<Booking> {
    return of(null);
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return of(null);
  }

  saveBooking(booking: Booking): Observable<Booking> {
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

  constructor(private http: HttpClient) {
    console.log(environment.restURL);
  }

}
