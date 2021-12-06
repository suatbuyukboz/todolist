import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  priorities = [
    'Bugün',
    'Bu Hafta',
    'Bu Ay'
  ];

  selectedIndex: string;

  constructor(public dialogRef: MatDialogRef<FilterComponent>, @Inject(MAT_DIALOG_DATA) public data: { time: Date, type: string }) {
    this.selectedIndex = data.type;
  }

  ngOnInit(): void {}

  Save() {
    // seçili filtreyi gönderir
    let now: Date = new Date();

    if (this.selectedIndex == "Bugün") {
      this.dialogRef.close([now, 0]);
    }
    else if (this.selectedIndex == "Bu Hafta") {
      now.setDate(now.getDate() + 7);
      this.dialogRef.close([now, 1]);
    }
    else {
      now.setDate(now.getDate() + 30);
      this.dialogRef.close([now, 2]);
    }
  }

  Clean() {
    // filtreyi temizler
    this.selectedIndex = null;
    this.dialogRef.close([null, null]);
  }

}
