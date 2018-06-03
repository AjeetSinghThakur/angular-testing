import { UsersComponent } from "./users.component";
import { of } from "rxjs/observable/of";

describe('User Component',()=>{
  let component: UsersComponent;

  const fakeUser = { id: 5, name:"fake"};

  //Manual way of faking a service and its methods.
  //const fakeUserService = { getUsers:() => of([fakeUser]), httpClient: {}} as any;

  //Let jasmine to create an spy object and initialize the fake service and its methods.
  const fakeUserService = jasmine.createSpyObj('userService',['getUsers']);

  beforeEach(()=>{
     component = new UsersComponent(fakeUserService);
  });

  it('should have a component',()=>{
    expect(component).toBeTruthy();
  });

  it('should have a list of users',()=>{
    const spy = fakeUserService.getUsers.and.returnValue(of([fakeUser]));
    component.ngOnInit();
    component.users$.subscribe(users => {
      expect(users).toEqual([fakeUser]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })
});
