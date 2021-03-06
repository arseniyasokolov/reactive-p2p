import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { LocalStorageAdapter } from '../../../core/core/services/local-storage.adapter';
import { ICardTransfer } from '../../../core/card-transfer.interface';
import { HistoryListItemViewModel } from '../view-models/history-list-item.view-model';

@Injectable()
export class HistoryService {

    private _localStorage: LocalStorageAdapter<ICardTransfer> = new LocalStorageAdapter();

    public getTransfers(): Observable<HistoryListItemViewModel[]> {
        return this._localStorage.get('transfers').pipe(
            map(items => items.map(i => new HistoryListItemViewModel(i)))
        );
    }

    public getTransferById(id: string): Observable<HistoryListItemViewModel> {
        return this.getTransfers().pipe(
            first(),
            map(items => items.find(i => i.Id === id))
        );
    }

    public deleteTransfer(id: string): Observable<void> {
        return this._localStorage.delete('transfers', id);
    }

}

