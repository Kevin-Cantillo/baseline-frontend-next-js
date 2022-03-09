import productsModel from '@models/Products';
import { storage } from '@database/Firebase';
// import data from '@database/dataBio';
class ProductsService {
  getAllProducts = async (lastProdcut, limit = 10, selectedfilters = []) => {
    // console.log(`Total dato to upload ${data.length}`);
    // const resp = await productsModel.bulkInsert(data);
    console.log(selectedfilters);
    const resp = await productsModel.get(selectedfilters, {
      orderBy: 'nombreProducto',
      startAfter: lastProdcut || null,
      limit
    });
    console.log(resp);
    return resp;
  };

  getProductById = async (slugName = '') => {
    const id = slugName.split('-').pop();
    const resp = await productsModel.getById(id);
    return resp;
  };

  getOffersProducts = async () => {
    const resp = await productsModel.get([['estaEnOferta', '==', 1]], {});
    return resp;
  };

  getOutstendingProducts = async () => {
    const resp = await productsModel.get([['esDestacado', '==', 1]], {});
    return resp;
  };

  getListImages = async () => {
    const listRef = storage.ref();
    const images = [];

    // Find all the prefixes and items.
    const url = 'https://firebasestorage.googleapis.com/v0/b/';
    const res = await listRef.listAll();

    res.items.forEach(itemRef => {
      // All the items under listRef.
      // console.log('itemRef', itemRef.fullPath);
      const imageUrl = `${url + itemRef.bucket}/o/${
        itemRef.fullPath
      }?alt=media&token=2f326bcd-2008-4523-8239-3185fd9c7523`;

      images.push(imageUrl.replace(/ /gi, '%20'));
    });
    // console.log('total images loaded', images.length);
    return images;
  };
}
export default new ProductsService();
