export const getAllItemsByType = async (type: string) => {
    let pack_items = (await game.packs?.find(e => e.metadata.name === type)?.getContent())?.map(x => x.data) || [];
    let game_items = game.items?.filter(x => x.type === type).map(x => x.data as Entity.Data) || []
    return pack_items.concat(game_items)
}