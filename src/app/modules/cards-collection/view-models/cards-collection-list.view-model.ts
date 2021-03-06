import { CardModel } from '../../../core/core/models/card/card.base.model';
import { ICardData } from '../../../core/core/models/card/card.data';
import { SenderCardModel } from '../../../core/core/models/card/sender-card.model';
import { ContragentCardModel } from '../../../core/core/models/card/contragent-card.model';
import { CardCreateStrategy } from '../../../core/core/models/card/card-create-strategy';

export class CardsCollectionListViewModel {

    public get IsEmpty(): boolean {
        return this._isEmpty;
    }
    public get Items(): CardModel[] {
        return this._items || [];
    }

    public _startOfContragentListIndex: number;

    private _isEmpty: boolean;
    private _items: CardModel[];

    public initialize(cards: ICardData[]) {
        if (!cards) {
            this._isEmpty = true;
            return;
        }
        this._items = cards.map(item => CardCreateStrategy.createFromData(item));
        Object.seal(this._items);
        this.sortItems();
        this._startOfContragentListIndex = this.Items.findIndex(i => i instanceof ContragentCardModel);
    }

    public isStartOfContragentList(index: number): boolean {
        return index === this._startOfContragentListIndex;
    }

    private sortItems() {
        this._items.sort((a: CardModel, b: CardModel) => a instanceof SenderCardModel ? -1 : 1);
    }

    /** TO DO */
    private filterItems() {

    }

}