import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Contact {
    _id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read?: boolean;
    createdAt?: string;
}

export interface ContactResponse {
    success: boolean;
    data?: Contact | Contact[];
    message?: string;
    error?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    // Public - send contact message
    sendMessage(contact: Omit<Contact, '_id' | 'read' | 'createdAt'>): Observable<ContactResponse> {
        return this.http.post<ContactResponse>(
            `${this.baseUrl}/contact`,
            contact
        );
    }

    // Protected - get all contacts (admin)
    private getHeaders(): HttpHeaders {
        const apiKey = localStorage.getItem('apiKey') || '';
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        });
    }

    getAll(): Observable<ContactResponse> {
        return this.http.get<ContactResponse>(
            `${this.baseUrl}/api/contacts`,
            { headers: this.getHeaders() }
        );
    }

    markAsRead(id: string): Observable<ContactResponse> {
        return this.http.patch<ContactResponse>(
            `${this.baseUrl}/api/contacts/${id}/read`,
            {},
            { headers: this.getHeaders() }
        );
    }

    delete(id: string): Observable<ContactResponse> {
        return this.http.delete<ContactResponse>(
            `${this.baseUrl}/api/contacts/${id}`,
            { headers: this.getHeaders() }
        );
    }
}
