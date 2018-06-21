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
    MatListModule
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
        MatDialogModule
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
        MatDialogModule
    ]
})
export class MaterialModule { }
