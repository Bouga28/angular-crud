import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
styles: [
  // todo: figure out how to make width dynamic
  'form { display: flex; flex-direction: column; min-width: 500px; }',
  'form > * { width: 100% }'
]
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
