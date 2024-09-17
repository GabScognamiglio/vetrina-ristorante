import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from 'src/app/service/contact-form.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  center: google.maps.LatLngLiteral = { lat: 41.771722, lng: 12.230056 };
  zoom = 16;
  markerPosition: google.maps.LatLngLiteral = { lat: 41.771722, lng: 12.230056 };
  contactForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  lightMapStyle: google.maps.MapTypeStyle[] = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#333333' }]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#cccccc' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#eeeeee' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#d5e8d4' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#333333' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#cccccc' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c9e7f4' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#333333' }]
    }
  ];

  darkMapStyle: google.maps.MapTypeStyle[] = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#1d1d1d' }]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#cfcfcf' }]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#1a1a1a' }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#444444' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#2b2b2b' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#1c1c1c' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#292929' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d4af37' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#333333' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{ color: '#505050' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0d0d0d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#808080' }]
    }
  ];

  lightMapOptions: google.maps.MapOptions = {
    styles: this.lightMapStyle
  };

  darkMapOptions: google.maps.MapOptions = {
    styles: this.darkMapStyle
  };

  mapOptions: google.maps.MapOptions = this.lightMapOptions;



  constructor(private themeService: ThemeService, private fb: FormBuilder, private contactFormSrv: ContactFormService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme: string) => {
      this.mapOptions = theme === 'dark' ? this.darkMapOptions : this.lightMapOptions;
    });
  }

  sendForm(contactForm: FormGroup) {
    if (contactForm.valid) {
      this.contactFormSrv.saveContactForm(contactForm.value).subscribe({
        next: (response) => {
          // Successo
          console.log("Modulo inviato con successo", response);
          this.successMessage = "Modulo inviato con successo!";
          this.errorMessage = null;
        },
        error: (error) => {
          // Errore
          console.error("Errore nell'invio del modulo:", error.message);
          this.errorMessage = "Errore nell'invio del modulo: " + error.message;
          this.successMessage = null;
        }
      });
    }
    console.log(contactForm.value);
    contactForm.reset();
  }
}
