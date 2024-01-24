---
PROPS:
  - name: color
    type: String
    values: Vuesax Colors, RGB, HEX
    description: Change the color of the radio.
    default: primary
    link: null
    usage: '#color'
    code: >
            <vs-radio success v-model="picked" val="2">
              Success
            </vs-radio>

  - name: disabled
    type: Boolean
    values: true,false
    description: Determine if the component is in the disabled state.
    default: false
    link: null
    usage: '#default'
    code: >
            <vs-radio disabled v-model="picked" val="3">
              Option C
            </vs-radio>

  - name: loading
    type: Boolean
    values: true,false
    description: Determine if the component has a loading animation and is disabled.
    default: false
    link: null
    usage: '#loading'
    code: >
            <vs-radio loading v-model="picked" val="1">
              Option 1
            </vs-radio>

  - name: val
    type: String
    values: String
    description: Determine the value of the radio input.
    default: null
    link: null
    usage: '#default'
    code: >
            <vs-radio v-model="picked" val="1">
              Option A
            </vs-radio>

SLOTS:
  - name: default
    type: slot
    values: null
    description: Add a label to the component.
    default: null
    link: null
    usage: '#label'
    code: >
            <vs-radio v-model="picked" val="1">
              Label
            </vs-radio>
  - name: icon
    type: slot
    values: null
    description: Add an icon inside the radio.
    default: null
    link: null
    usage: '#icon'
    code: >
            <vs-radio v-model="picked" val="1">
              Yen
              <template #icon>
                <i class='bx bx-yen' ></i>
              </template>
            </vs-radio>

NEWS:
  - loading
  - icon
  - label
---

# Radio

<card>

## Default

<docs-warn />

Add the radio type input with the component `<vs-radio />`

<div slot="example">
  <Radio-default />
</div>

<div slot="template">

  ```html{3,4,5}
    <template>
      <div class="center">
          <vs-radio v-model="picked" val="1">
            Option A
          </vs-radio>
          <vs-radio v-model="picked" val="2">
            Option B
          </vs-radio>
          <vs-radio disabled v-model="picked" val="3">
            Option C
          </vs-radio>
          <vs-radio v-model="picked" val="4">
            Option D
          </vs-radio>
      </div>
    </template>
  ```

</div>

<div slot="script">

  ```html{4}
    <script>
      export default {
        data:() => ({
          picked: 1,
        })
      }
    </script>
  ```

</div>

</card>

<card>