import {ref, reactive, watch} from 'vue'

const not = val => !val

export function useField(field) {
    const valid = ref(true)
    const value = ref(field.value)
    const touched = ref(false)
    const errors = reactive({})

    const reassing = val => {
        valid.value = true
        Object.keys(field.validators ?? {}).map(name => {
            const isValid = field.validators[name](val)
            errors[name] = not(isValid)
            if (not(isValid)) {
                valid.value = false
            }
        })
    }


    watch(value, reassing)
    reassing(field.value)

    return {value, valid, errors, touched, blur: () => touched.value = true}
}