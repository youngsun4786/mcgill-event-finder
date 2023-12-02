import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPostComponent } from './upcoming-post.component';

describe('UpcomingPostComponent', () => {
  let component: UpcomingPostComponent;
  let fixture: ComponentFixture<UpcomingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
