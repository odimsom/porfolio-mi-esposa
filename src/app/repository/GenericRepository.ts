import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

@Injectable({ providedIn: 'root' })
export class GenericRepository<T> {
    protected http = inject(HttpClient);
    protected baseUrl = environment.apiUrl;
    protected endpoint = '';

    protected getHeaders(): HttpHeaders {
        const apiKey = localStorage.getItem('apiKey') || '';
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        });
    }

    getAll(): Observable<ApiResponse<T[]>> {
        return this.http.get<ApiResponse<T[]>>(
            `${this.baseUrl}/api/${this.endpoint}`,
            { headers: this.getHeaders() }
        );
    }

    getById(id: string): Observable<ApiResponse<T>> {
        return this.http.get<ApiResponse<T>>(
            `${this.baseUrl}/api/${this.endpoint}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    create(item: Partial<T>): Observable<ApiResponse<T>> {
        return this.http.post<ApiResponse<T>>(
            `${this.baseUrl}/api/${this.endpoint}`,
            item,
            { headers: this.getHeaders() }
        );
    }

    update(id: string, item: Partial<T>): Observable<ApiResponse<T>> {
        return this.http.put<ApiResponse<T>>(
            `${this.baseUrl}/api/${this.endpoint}/${id}`,
            item,
            { headers: this.getHeaders() }
        );
    }

    delete(id: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(
            `${this.baseUrl}/api/${this.endpoint}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    updateOrder(items: T[]): Observable<ApiResponse<T[]>> {
        return this.http.put<ApiResponse<T[]>>(
            `${this.baseUrl}/api/${this.endpoint}/reorder`,
            { items },
            { headers: this.getHeaders() }
        );
    }
}
