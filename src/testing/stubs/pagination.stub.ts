import { PaginationDTO } from 'src/common/dtos';

export function paginationStub(): PaginationDTO {
  return {
    skip: '2',
    limit: '0',
  };
}
