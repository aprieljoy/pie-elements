Model for the @pie-elements/explicit-constructed-response

The schema defines the following properties:

# `choices` (object, required)

* Object with all the available choices for each response area.
* Keys need to be integers from 0 to n - 1 (where n is the number of areas)

# `markup` (string, required)

The markup for the pie-ui element

# `prompt` (string)

The item stem for the question

# `promptEnabled` (boolean)

Indicates if the prompt is enabled

# `rationale` (string, required)

Indicates correct answer rationale

# `autoScoring` (string, enum, required)

Indicates auto scoring type

This element must be one of the following enum values:

* `allOrNothing`
* `partial`

# `studentInstructions` (string)

Indicates student instructions

# `teacherInstructions` (string)

Indicates teacher instructions

# `rubric` (string, required)

Indicates value for rubric

# `rationaleEnabled` (boolean, required)

Indicates if Rationale are enabled

# `studentInstructionsEnabled` (boolean, required)

Indicates if Student Instructions are enabled

# `teacherInstructionsEnabled` (boolean, required)

Indicates if Teacher Instructions are enabled

# `id` (string, required)

Identifier to identify the Pie Element in html markup, Must be unique within a pie item config.

# `element` (string, required)

The html Element tag name

---

# Sub Schemas

The schema defines the following additional types:

## `ConfigureProp` (object)

Properties of the `ConfigureProp` object:

### `settings` (boolean)

Indicates if the item has to be displayed in the Settings Panel

### `label` (string)

Indicates the label for the item that has to be displayed in the Settings Panel

## `Choice` (object)

Properties of the `Choice` object:

### `value` (string, required)

The value for the choice

### `label` (string, required)

The label of the choice