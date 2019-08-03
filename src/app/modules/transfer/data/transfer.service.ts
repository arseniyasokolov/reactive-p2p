import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageAdapter } from 'core-library/core/services/local-storage.adapter';
import { ICardTransfer, ICardAddToCollection } from '../../../core/card-transfer.interface';
import { first, map, tap } from 'rxjs/operators';

@Injectable()
export class TransferService {

    private _localStorage: LocalStorageAdapter<{ id: string }> = new LocalStorageAdapter();

    public handleNewTransfer(data: ICardTransfer & ICardAddToCollection): Observable<void> {
        return this.sendTransfer(data).pipe(tap(() => this.saveCards(data)));
    }

    private sendTransfer(transfer: ICardTransfer): Observable<void> {
        return this._localStorage.post('transfers', [transfer]);
    }

    private saveCards(data: ICardTransfer & ICardAddToCollection): void {
        const cards = [];
        if (data.isSaveSenderCard)
            cards.push(data.senderCard);
        if (data.isSaveContragentCard)
            cards.push(data.contragentCard);
        if (cards.length)
            this._localStorage.post('cardsCollection', cards).subscribe();
    }

    public getTransferById(id: string): Observable<ICardTransfer> {
        return this._localStorage.get('transfers').pipe(
            first(),
            map(items => items.find(i => i.id === id) as ICardTransfer)
        );
    }

}

