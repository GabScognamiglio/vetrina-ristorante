import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentTheme = 'dark'; // Imposta il tema di default

  isTransparent: boolean = false;
  isHome: boolean = false; // Per controllare se siamo nella home

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd)) // Solo quando la navigazione è finita
      .subscribe(() => {
        // Controlla se siamo nella Home
        this.isHome = this.router.url === '/';
        this.isTransparent = this.isHome; // Solo sulla home è trasparente
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset;

    // Solo sulla home, cambia trasparenza in base allo scroll
    if (this.isHome) {
      this.isTransparent = scrollOffset <= 50; // Trasparente fino a 50px di scroll
    }
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

}
