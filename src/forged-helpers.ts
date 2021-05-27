export const getAllItemsByType = async (type: string) => {
  const pack_items =
    (
      await game.packs?.find((e) => e.metadata.name === type)?.getContent()
    )?.map((x: any) => x.data as Entity.Data) || [];
  const game_items =
    game.items
      ?.filter((x) => x.type === type)
      .map((x) => x.data as Entity.Data) || [];
  return [...pack_items, ...game_items];
};
