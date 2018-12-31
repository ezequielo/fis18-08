import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableCreditsComponent } from './editable-credits.component';

describe('EditableCreditsComponent', () => {
  let component: EditableCreditsComponent;
  let fixture: ComponentFixture<EditableCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
