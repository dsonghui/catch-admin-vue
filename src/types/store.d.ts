/**
 * TypeScript Store 类型提示设置;
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2017/01/24
 */

interface Getters {
}

declare module 'vuex' {
    interface Store<S> {
        testabc: string;
        readonly getters: Getters | any;
    }

}
