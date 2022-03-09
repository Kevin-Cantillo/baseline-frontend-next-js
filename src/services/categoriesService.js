import categoriesModel from '@models/Categories';

// import data from '@database/data';
class CategoriesService {
  getAllCategories = async () => {
    // console.log(`Total dato to upload ${data.length}`);
    // const resp = await categoriesModel.bulkInsert(data);
    // return resp;
    const resp = await categoriesModel.get([], {
      orderBy: 'nombreCategoria'
    });
    return resp;
  };
}

export default new CategoriesService();
