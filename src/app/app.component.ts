import { Component, Output, Input, ViewChild, ElementRef } from "@angular/core";
import Pica from "pica";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  pica = Pica();

  @ViewChild("mycanvas", { static: false }) canvas: ElementRef;
  onChange(files: File[]): any {
    const file: File = files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (data: ProgressEvent) => {
      const img = new Image();
      img.addEventListener(
        "load",
        async () => {
          await this.pica.resize(img, this.canvas.nativeElement);
          console.log("done");
          (this.canvas.nativeElement as HTMLCanvasElement).toBlob((blob) => {
            // serve blob to server
            console.log(blob);
          });
        },
        false
      );
      img.src = (data.target as FileReader).result.toString();
    };
  }
}
