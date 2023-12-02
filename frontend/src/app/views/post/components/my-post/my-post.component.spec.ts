import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostComponent } from './my-post.component';

describe('MyPostComponent', () => {
  let component: MyPostComponent;
  let fixture: ComponentFixture<MyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
