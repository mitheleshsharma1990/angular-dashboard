import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceChart } from './audience-chart';

describe('AudienceChart', () => {
  let component: AudienceChart;
  let fixture: ComponentFixture<AudienceChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienceChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudienceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
