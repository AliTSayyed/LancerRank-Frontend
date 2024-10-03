import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualFreelancerReviewComponent } from './manual-freelancer-review.component';

describe('ManualFreelancerReviewComponent', () => {
  let component: ManualFreelancerReviewComponent;
  let fixture: ComponentFixture<ManualFreelancerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualFreelancerReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualFreelancerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
