
<script>
    export default {
        name: 'Calculator',
        data () {
            return {
                // name:               '',
                email:              '',
                // phone:              '',
                form_id:      Math.random().toString(36).substr(2, 9),
                wall_material:      '',
                wall_thickness:     '',
                calculation_items:  [],
                casing_thickness:   '',
                info:               '',
                windows:            [{}],
                doors:              [{}]
            }
        },

        beforeMount: function () {
            if (this.$root.$el.dataset.options)
                this.$root.options = JSON.parse(this.$root.$el.dataset.options);
        },
        mounted: function () {
            if (this.$root.options.onInit && window[this.$root.options.onInit] && typeof window[this.$root.options.onInit] == 'function')
                window[this.$root.options.onInit](this.$el);
        },

        methods: {
            action: function () {
                let request = new XMLHttpRequest();
                //request.open("POST", "https://httpbin.org/post", true);
                request.open("POST", "/mail-calculation.php", true);
                request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                request.send(JSON.stringify( this.$data ));
                request.onreadystatechange = () => {
                    if(request.readyState == 4 && request.status == 200) {
                        if (this.$root.options.onOrder && window[this.$root.options.onOrder] && typeof window[this.$root.options.onOrder] == 'function')
                            window[this.$root.options.onOrder](this.$el);
                    }
                }
            }
        }
    }

</script>

<template>
    <form class="calculation" @submit.prevent="action">
        <input v-model="form_id" class="uniq_form_id" type="hidden" />
        <!--<div class="calculation__group form-group">-->
            <!--<label class="calculation__label"> Ваше имя </label>-->
            <!--<input v-model="name" type="text" class="calculation__input form-control">-->
        <!--</div>-->
        <!--<div class="calculation__group form-group">-->
            <!--<label class="calculation__label">Телефон</label>-->
            <!--<input v-model="phone" v-phone type="text" class="calculation__input form-control">-->
        <!--</div>-->
        <div class="calculation__group form-group">
            <label class="calculation__label">Размеры и количество окон в доме</label>
            <div v-for="(w, i) in windows" class="calculation__row row">
                <div class="calculation__col col-4">
                    <div class="calculation__input-group input-group">
                        <input v-only-numbers type="text" v-model="w.height" class="form-control calculation__input" placeholder="Высота">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="calculation__col col-4">
                    <div class="calculation__input-group input-group">
                        <input v-only-numbers type="text" v-model="w.width" class="form-control calculation__input" placeholder="Ширина">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="calculation__col col-4">
                    <div class="calculation__delete-row">
                        <div class="calculation__input-group input-group">
                            <input v-only-numbers type="text" v-model="w.num" class="form-control calculation__input" placeholder="Количество">
                            <div class="input-group-append"><span class="input-group-text">шт</span></div>
                        </div>
                        <div><button type="button" v-show="i" @click="windows.splice(i, 1)" class="calculation__delete-btn">&times;</button></div>
                    </div>
                </div>
            </div>
            <div class="calculation__add-btn-wrapper text-right">
                <button type="button" class="calculation__btn btn btn-success btn-sm" @click="windows.push({})">Добавить окна</button>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label">Размеры и количество дверей в доме</label>
            <div v-for="(d, i) in doors" class="calculation__row row">
                <div class="calculation__col col-4">
                    <div class="calculation__input-group input-group">
                        <input v-only-numbers type="text" v-model="d.height" class="form-control calculation__input" placeholder="Высота">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="calculation__col col-4">
                    <div class="calculation__input-group input-group">
                        <input v-only-numbers type="text" v-model="d.width" class="form-control calculation__input" placeholder="Ширина">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="calculation__col col-4">
                    <div class="calculation__delete-row">
                        <div class="calculation__input-group input-group">
                            <input v-only-numbers type="text" v-model="d.num" class="form-control calculation__input" placeholder="Количество">
                            <div class="input-group-append"><span class="input-group-text">шт</span></div>
                        </div>
                        <div><button type="button" v-show="i" @click="doors.splice(i, 1)" class="calculation__delete-btn">&times;</button></div>
                    </div>
                </div>
            </div>
            <div class="calculation__add-btn-wrapper text-right">
                <button type="button" class="calculation__btn btn btn-success btn-sm" @click="doors.push({})">Добавить двери</button>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label"> Материал стены вашего дома </label>
            <div>
                <div v-for="(v, k) in { prof_brus: 'профилированный брус', brevno: 'оцилиндрованное бревно', kley_brus: 'клееный брус', ruchnoe_brevno: 'бревно ручной рубки' }" class="calculation__radio form-check form-check-inline">
                    <input :id="'check_' + k"  name="wall_material" v-model="wall_material" class="form-check-input" type="radio" :value="k">
                    <label :for="'check_' + k" class="form-check-label"> {{ v }} </label>
                </div>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label">Толщина стены дома</label>
            <div class="calculation__input-group input-group">
                <input v-only-numbers style="max-width: 100px;" type="text" v-model="wall_thickness" class="form-control calculation__input">
                <div class="input-group-append"><span class="input-group-text">см</span></div>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label">Выполнить расчет</label>
            <div>
                <div v-for="(v, k) in { stoimost_obsad: 'стоимости обсад', podgotovka_proemov: 'подготовка проёмов', montazh_obsad: 'сборка и монтаж обсад', dostavka: 'доставка' }" class="calculation__checkbox form-check form-check-inline">
                    <input :id="'check_' + k"  name="calculation_items" v-model="calculation_items" class="form-check-input" type="checkbox" :value="k">
                    <label :for="'check_' + k" class="form-check-label"> {{ v }} </label>
                </div>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label">Толщина обсады</label>
            <div>
                <div v-for="(v, k) in { '40mm': '40 мм', '65mm': '65 мм', any: 'неважно' }" class="calculation__radio form-check form-check-inline">
                    <input :id="'check_' + k"  name="casing_thickness" v-model="casing_thickness" class="form-check-input" type="radio" :value="k">
                    <label :for="'check_' + k" class="form-check-label"> {{ v }} </label>
                </div>
            </div>
        </div>

        <div class="calculation__group form-group">
            <label class="calculation__label">Электронная почта для получения результата</label>
            <input v-model="email" type="email" class="calculation__input form-control" placeholder="необязательно">
        </div>

        <div class="form-group">
            <label class="calculation__label">Дополнительная информация</label>
            <textarea class="form-control calculation__input" v-model="info"></textarea>
        </div>

        <button type="submit" class="calculation__btn btn btn-lg btn-block btn-primary">Отправить</button>
    </form>
</template>

<style>
    .calculation__delete-row {
        display: flex;
        align-items: center;
    }

    .calculation__delete-row > *:last-child {
        flex: 1 0 auto;
    }
</style>