import { Room } from './room';

export class RoomsWithNumberOffItmes {
    roomDTOList: Room[];
    numberOfItems: number;
    constructor(roomDTOList: Room[], numberOfItems: number) {
        this.roomDTOList = roomDTOList;
        this.numberOfItems = numberOfItems;
    }
}