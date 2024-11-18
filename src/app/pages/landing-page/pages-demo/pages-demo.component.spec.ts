import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesDemoComponent } from './pages-demo.component';

describe('PagesDemoComponent', () => {
  let component: PagesDemoComponent;
  let fixture: ComponentFixture<PagesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
