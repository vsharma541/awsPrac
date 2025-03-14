import {hello} from "@api/lodash-util";
// import { hello } from "/opt/local_modules/@api/lodash-util";
export const handler = (event) => {
    console.log(hello());
};
// handler();