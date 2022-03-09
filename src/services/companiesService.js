import companiesModel from '@models/Companies';

// import data from '@database/data';
class CompaniesService {
  getAllCompanies = async (lastProdcut, limit = 10) => {
    //  console.log(`Total dato to upload ${data.length}`);
    // const resp = await companiesModel.bulkInsert(data);
    const resp = await companiesModel.get([], {
      orderBy: 'nombreEmpresa',
      startAfter: lastProdcut || null,
      limit
    });
    return resp;
  };
}

export default new CompaniesService();
