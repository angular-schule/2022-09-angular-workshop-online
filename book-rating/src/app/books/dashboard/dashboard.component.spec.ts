import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [],
      providers: [
        // TODO: BookRatingService ersetzen
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // Zugriff auf den DOM:
    // Natives HTML-Element vom Browser:
    // fixture.nativeElement.querySelector('#foo');
    // Abstraktion von Angular, funktioniert auch in Nicht-Browser-Umgebung:
    // fixture.debugElement.query(By.css('#foo'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {});
});
