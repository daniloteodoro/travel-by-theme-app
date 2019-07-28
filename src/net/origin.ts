import { Origin } from "../domain";

const AMS: Origin = {
	id: 'AMS',
	name: 'Amsterdam / NL'
}
const MAD: Origin = {
	id: 'MAD',
	name: 'Madri / ES'
}
const LON: Origin = {
	id: 'LON',
	name: 'London / UK'
}
const PAR: Origin = {
	id: 'PAR',
	name: 'Paris / FR'
}
const BOS: Origin = {
	id: 'BOS',
	name: 'Boston / US'
}
const SFO: Origin = {
	id: 'SFO',
	name: 'San Francisco / US'
}
const MIA: Origin = {
	id: 'MIA',
	name: 'Miami / US'
}
const FRA: Origin = {
	id: 'FRA',
	name: 'Frankfurt / DE'
}
const MUC: Origin = {
	id: 'MUC',
	name: 'Munich / DE'
}

const DEFAULT_ORIGIN_LIST: Origin[] = [AMS, MAD, LON, PAR, BOS, SFO, MIA, FRA, MUC].sort((left: Origin, right: Origin): number => {
	if (left.name < right.name) { return -1; }
    if (left.name > right.name) { return 1; }
    return 0;
});

export { DEFAULT_ORIGIN_LIST };
