import { NgModule } from '@angular/core';
import {
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTabsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTabsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule
    ]
})
export class MaterialModule { }
