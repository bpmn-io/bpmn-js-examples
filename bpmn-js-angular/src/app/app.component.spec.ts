import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModelerService } from './modeler.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponentInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [ModelerService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponentInstance = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('creates the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('calls ngAfterContentInit', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'ngAfterContentInit').and.callThrough();
    fixture.detectChanges();
    expect(appComponentInstance.ngAfterContentInit).toHaveBeenCalled();
  });
});
