import { Component, ElementRef, ViewChild } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.css']
})
export class JsoneditorComponent {

  isExpanded: boolean = false;
  isCollapsed: boolean = false;

  @ViewChild("editor1")
  private editor1!: ElementRef<HTMLElement>;
  @ViewChild("editor2")
  private editor2!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    const aceEditor1 = ace.edit(this.editor1.nativeElement);
    const aceEditor2 = ace.edit(this.editor2.nativeElement);
    aceEditor2.setReadOnly(true);

    aceEditor1.renderer.setShowGutter(true);
    aceEditor1.setTheme("ace/theme/monokai");
    aceEditor1.session.setMode("ace/mode/json");

    aceEditor2.renderer.setShowGutter(true);
    aceEditor2.setTheme("ace/theme/monokai");
    aceEditor2.session.setMode("ace/mode/json");

    aceEditor1.getSession().on('change', () => {
      const content = aceEditor1.getValue();
      if (this.isJSON(content)) {

        aceEditor2.setValue(JSON.stringify(JSON.parse(content), null, 1));
      }
      else {
        aceEditor2.setValue("Error!");
      }
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    const whiteContainer = document.querySelector('.app-ace-editor1') as HTMLElement;
    if (this.isExpanded) {
        whiteContainer.classList.add('expanded');
    } else {
        whiteContainer.classList.remove('expanded');
    }
}

  beautifyJson() {
    const aceEditor1 = ace.edit(this.editor1.nativeElement);
    const aceEditor2 = ace.edit(this.editor2.nativeElement);
    const content = aceEditor1.getValue();
    if (this.isJSON(content)) {
      aceEditor2.setValue(JSON.stringify(JSON.parse(content), null, 2));
    }
    else {
      aceEditor2.setValue("Error!");
    }
  }

  isJSON(jsonString: string) {
    try {
      var o = JSON.parse(jsonString);

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
        return true;
      }
    }
    catch (e) { }

    return false;
  };
}
