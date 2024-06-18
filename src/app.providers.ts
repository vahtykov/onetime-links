import { Link } from './entities/link.entity';
import { LINKS_REPOSITORY } from './constants';

export const appProviders = [
  {
    provide: LINKS_REPOSITORY,
    useValue: Link,
  },
];
