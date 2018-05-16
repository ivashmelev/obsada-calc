
<script>
    export default {
        name: 'Calculator',
        data () {
            return {
                name:               '',
                email:              '',
                phone:              '',
                wall_material:      '',
                wall_thickness:     '',
                calculation_items:  [],
                casing_thickness:   '',
                info:               '',
                windows:            [{}],
                doors:              [{}]
            }
        },

        methods: {
            action: function () {
                let request = new XMLHttpRequest();
                request.open("POST", "https://httpbin.org/post", true);
                request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                request.send(JSON.stringify( this.$data ));
                request.onreadystatechange = () => {//Call a function when the state changes.
                    if(request.readyState == 4 && request.status == 200) {
                        alert("Ваша заявка принята\n" + JSON.stringify( this.$data ));
                    }
                }
            }
        }
    }
</script>

<template>
    <form @submit.prevent="action">
        <div class="form-group">
            <label> Ваше имя </label>
            <input v-model="name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Адрес электронной почты</label>
            <input v-model="email" type="email" class="form-control">
        </div>
        <div class="form-group">
            <label>Телефон</label>
            <input v-model="phone" v-phone type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Размеры и количество окон в доме</label>
            <div v-for="(w, i) in windows" class="row">
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input v-only-numbers type="text" v-model="w.height" class="form-control" placeholder="Высота">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input v-only-numbers type="text" v-model="w.width" class="form-control" placeholder="Ширина">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div style="display: flex; align-items: flex-start">
                        <div class="input-group mb-3">
                            <input v-only-numbers type="text" v-model="w.num" class="form-control" placeholder="Количество">
                            <div class="input-group-append"><span class="input-group-text">шт</span></div>
                        </div>
                        <a v-show="i" @click.prevent="windows.splice(i, 1)" style="margin-left: 5px;" href="#" class="btn btn-danger">&times;</a>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <a class="btn btn-success btn-sm" @click.prevent="windows.push({})" href="#">Добавить окна</a>
            </div>
        </div>

        <div class="form-group">
            <label>Размеры и количество дверей в доме</label>
            <div v-for="(d, i) in doors" class="row">
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input v-only-numbers type="text" v-model="d.height" class="form-control" placeholder="Высота">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input v-only-numbers type="text" v-model="d.width" class="form-control" placeholder="Ширина">
                        <div class="input-group-append"><span class="input-group-text">см</span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div style="display: flex; align-items: flex-start">
                        <div class="input-group mb-3">
                            <input v-only-numbers type="text" v-model="d.num" class="form-control" placeholder="Количество">
                            <div class="input-group-append"><span class="input-group-text">шт</span></div>
                        </div>
                        <a v-show="i" @click.prevent="doors.splice(i, 1)" style="margin-left: 5px;" href="#" class="btn btn-danger">&times;</a>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <a class="btn btn-success btn-sm" @click.prevent="doors.push({})" href="#">Добавить двери</a>
            </div>
        </div>

        <div class="form-group">
            <label> Материал стены вашего дома </label>
            <div>
                <div v-for="(v, k) in { prof_brus: 'профилированный брус', brevno: 'оцилиндрованное бревно', kley_brus: 'клееный брус', ruchnoe_brevno: 'бревно ручной рубки' }" class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input name="wall_material" v-model="wall_material" class="form-check-input" type="radio" :value="k">
                        {{ v }}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Толщина стены дома</label>
            <div class="input-group mb-3">
                <input v-only-numbers style="max-width: 100px;" type="text" v-model="wall_thickness" class="form-control">
                <div class="input-group-append"><span class="input-group-text">см</span></div>
            </div>
        </div>

        <div class="form-group">
            <label>Выполнить расчет</label>
            <div>
                <div v-for="(v, k) in { stoimost_obsad: 'стоимости обсад', podgotovka_proemov: 'подготовка проёмов', montazh_obsad: 'сборка и монтаж обсад', dostavka: 'доставка' }" class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input name="calculation_items" v-model="calculation_items" class="form-check-input" type="checkbox" :value="k">
                        {{ v }}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Толщина обсады</label>
            <div>
                <div v-for="(v, k) in { '45mm': '45 мм', '65mm': '65 мм', any: 'неважно' }" class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input name="casing_thickness" v-model="casing_thickness" class="form-check-input" type="radio" :value="k">
                        {{ v }}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Дополнительная информация</label>
            <textarea class="form-control" v-model="info"></textarea>
        </div>

        <button type="submit" class="btn btn-lg btn-block btn-primary">Отправить</button>
    </form>
</template>
