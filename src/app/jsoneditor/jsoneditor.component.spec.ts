import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsoneditorComponent } from './jsoneditor.component';

describe('JsoneditorComponent', () => {
  let component: JsoneditorComponent;
  let fixture: ComponentFixture<JsoneditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsoneditorComponent]
    });
    fixture = TestBed.createComponent(JsoneditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
