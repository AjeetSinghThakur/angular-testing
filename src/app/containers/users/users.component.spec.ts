import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs/observable/of";
import { timer } from "rxjs/observable/timer";
import { mapTo } from "rxjs/operators";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  const fakeUser = { id: 5, name:"fake"};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ UsersComponent,UserListComponent ],
      providers: [UserService,
        { provide: HttpClient, useValue: {} },
      ],
      // schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of users',(done) => {
    const spy = spyOn(userService,'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
    component.ngOnInit();

    component.users$.subscribe(users => {
      expect(users).toEqual([fakeUser]);
      done();
    })
  });
  it('should have a list of users', fakeAsync(() => {
    const spy = spyOn(userService,'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
    component.ngOnInit();

    component.users$.subscribe(users => {
      console.log(document.querySelector('app-user-list').innerHTML);
      expect(users).toEqual([fakeUser]);
    });
    tick(1000);
    discardPeriodicTasks();
  }));
  it('should have a list of users1', async(() => {
    const spy = spyOn(userService,'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
    component.ngOnInit();
    fixture.detectChanges();

    component.users$.subscribe(users => {
      //console.log(document.querySelector('app-user-list').innerHTML);
      expect(users).toEqual([fakeUser]);
    });
    //tick(1000);
    //discardPeriodicTasks();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('.user-button'));
      expect(buttons[0].nativeElement.textContent).toEqual('fake');
    })
  }));
});



























// import { UsersComponent } from "./users.component";
// import { of } from "rxjs/observable/of";
// import { timer } from "rxjs/observable/timer";
// import { UserService } from "../../services/user.service";
// import { mapTo } from "rxjs/operators";

// describe('User Component',()=>{
//   let component: UsersComponent;

//   const fakeUser = { id: 5, name:"fake"};

//   //Manual way of faking a service and its methods.
//   //const fakeUserService = { getUsers:() => of([fakeUser]), httpClient: {}} as any;

//   //Let jasmine to create a spy object and initialize the fake service and its methods.
//   //const fakeUserService = jasmine.createSpyObj('userService',['getUsers']);
//   const userService = new UserService(null);

//   beforeEach(()=>{
//      component = new UsersComponent(userService);
//   });

//   it('should have a component',() => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a list of users',() => {

//     //const spy = fakeUserService.getUsers.and.returnValue(of([fakeUser]));
//     const spy = spyOn(userService,'getUsers').and.returnValue(of([fakeUser]));
//     component.ngOnInit();

//     component.users$.subscribe(users => {
//       expect(users).toEqual([fakeUser]);
//       expect(spy).toHaveBeenCalled();

//       expect(spy).toHaveBeenCalledWith()
//       expect(spy).toHaveBeenCalledTimes(1);
//     })
//   });

//   it('should have a list of users',(done) => {

//     //const spy = fakeUserService.getUsers.and.returnValue(of([fakeUser]));
//     const spy = spyOn(userService,'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
//     component.ngOnInit();

//     component.users$.subscribe(users => {
//       expect(users).toEqual([fakeUser]);
//       expect(spy).toHaveBeenCalled();

//       expect(spy).toHaveBeenCalledWith()
//       expect(spy).toHaveBeenCalledTimes(1);
//       done();
//     })
//   })
// });
