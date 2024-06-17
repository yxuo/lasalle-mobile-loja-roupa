import { NestFactory } from '@nestjs/core';
import { TipoClienteSeedService } from './tipo-cliente/tipo-cliente-seed.service';
import { SeedModule } from './seed.module';
import { differenceInMinutes } from 'date-fns';
import { ClienteSeedDataService } from './cliente/cliente-seed-data.service';
import { ClienteSeedService } from './cliente/cliente-seed.service';

// Save BRT time before set UTC
const localDateStr = new Date().toString();
global.__localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
process.env.TZ = 'UTC';
global.__localTzOffset = differenceInMinutes(
  new Date(localDateStr.split(' GMT')[0]).getTime(),
  new Date().getTime(),
);

const runSeed = async () => {
  // filter
  let services = [ClienteSeedService, TipoClienteSeedService];

  const FORCE_PARAM = '--force';
  const EXCLUDE_PARAM = '--exclude';
  const isForce = process.argv.slice(2).includes(FORCE_PARAM);
  const isExclude = process.argv.slice(2).includes(EXCLUDE_PARAM);
  global.force = isForce;
  const nameFilters = process.argv
    .slice(2)
    .filter((i) => ![FORCE_PARAM, EXCLUDE_PARAM].includes(i));
  if (nameFilters.length > 0) {
    services = services.filter(
      (s) =>
        nameFilters.some((n) =>
          s.name.toLowerCase().includes(n.toLowerCase()),
        ) !== isExclude,
    );
  }

  const app = await NestFactory.create(SeedModule);

  // validate
  console.log(
    `Validating modules before run: ${services
      .reduce((str: string[], i) => [...str, i.name], [])
      .join(', ')}`,
  );
  for (const module of services) {
    if (!(await app.get(module).validateRun()) && !isForce) {
      console.log(
        `[${module.name}]: Database is not empty or this seed is blocked by default, aborting seed...`,
      );
      console.log(
        `Tip: Use '${FORCE_PARAM}' parameter to ignore this message.`,
      );
      await app.close();
      return;
    }
  }

  // run
  console.log(
    `Running modules: ${services
      .reduce((str: string[], i) => [...str, i.name], [])
      .join(', ')}`,
  );
  for (const module of services) {
    await app.get(module).run();
  }

  await app.close();
};

void runSeed();
