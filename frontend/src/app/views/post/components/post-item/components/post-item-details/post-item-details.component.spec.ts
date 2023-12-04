import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemDetailsComponent } from './post-item-details.component';

describe('PostItemDetailsComponent', () => {
  let component: PostItemDetailsComponent;
  let fixture: ComponentFixture<PostItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostItemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
