## Introduction
Understanding the inner workings of this app took some effort. Therefore I decided
to write it up here.

## Layout
The app uses the Model-View-Controller architecture pattern.

**Model** defines data structure and updates application state to reflect added
items.

**View** defines user interface (UI) and receives updates from Model.

**Controller** contains control logic, e.g receives update from view and then
notifies model to 'add item'.
