import{L as s}from"./Source.c163b9e6.js";import{f as r}from"./TileEventType.49efe80f.js";class i extends s{constructor(e){e=e||{};const t=Object.assign({},e);delete t.preload,delete t.useInterimTilesOnError,super(t),this.on,this.once,this.un,this.setPreload(e.preload!==void 0?e.preload:0),this.setUseInterimTilesOnError(e.useInterimTilesOnError!==void 0?e.useInterimTilesOnError:!0)}getPreload(){return this.get(r.PRELOAD)}setPreload(e){this.set(r.PRELOAD,e)}getUseInterimTilesOnError(){return this.get(r.USE_INTERIM_TILES_ON_ERROR)}setUseInterimTilesOnError(e){this.set(r.USE_INTERIM_TILES_ON_ERROR,e)}getData(e){return super.getData(e)}}const E=i;export{E as B};