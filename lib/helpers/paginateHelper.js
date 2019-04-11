const defaultParams = {
  limit: 10,
  offset: 0,
  currentPage: 1,
  page: 1,
};

const BuildPaginate = ({
  limit, offset, currentPage, page,
} = defaultParams) => ({
  limit: parseInt(limit, 10) || 10,
  offset: parseInt(offset, 10) || 0,
  totalItems: 0,
  totalPages: 0,
  currentPage: parseInt(currentPage, 10) || 1,
  page: parseInt(page, 10) || 1,
  data: {},
});

const TotalPage = (resultCount, limit) => { Math.ceil((resultCount + 1) / limit); };

module.exports = {
  BuildPaginate,
  TotalPage,
};
