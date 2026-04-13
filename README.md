[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/geo-distance/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/geo-distance/actions)
[![License](https://img.shields.io/github/license/Tox1469/geo-distance?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/geo-distance?style=flat-square)](https://github.com/Tox1469/geo-distance/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/geo-distance?style=flat-square)](https://github.com/Tox1469/geo-distance/stargazers)

---

# geo-distance

Distancia entre coordenadas usando a formula de Haversine, alem de bearing e midpoint.

## Instalacao

```bash
npm install geo-distance
```

## Uso

```ts
import { haversine, bearing, midpoint, isWithin } from "geo-distance";

const sp = { lat: -23.5505, lng: -46.6333 };
const rj = { lat: -22.9068, lng: -43.1729 };

haversine(sp, rj, "km");
bearing(sp, rj);
midpoint(sp, rj);
isWithin(sp, rj, 500, "km");
```

## API

- `haversine(a, b, unit?)` — distancia em `m | km | mi | nmi`.
- `bearing(a, b)` — angulo inicial em graus.
- `midpoint(a, b)` — ponto medio geodesico.
- `isWithin(a, b, radius, unit?)` — teste de raio.

## Licenca

MIT