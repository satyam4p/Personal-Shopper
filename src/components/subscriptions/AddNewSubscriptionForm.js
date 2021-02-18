import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody,Form,FormGroup,Input,Label,FormText } from 'reactstrap';

const AddNewSubscription = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>New Subscription</PopoverHeader>
        <PopoverBody>
            {newSubscriptionForm()}
        </PopoverBody>
      </Popover>
    </div>
  );
}
 function newSubscriptionForm() {
    return (
        <Form>
          <FormGroup>
            <Label for="SubscriptionName">Subscription Name</Label>
            <Input type="name" name="Subname" id="SubscriptionName" placeholder="Subscription Name" />
          </FormGroup>
          <FormGroup>
            <Label for="StartsFrom">Starts From</Label>
            <Input type="date" name="date" id="StartsFrom" placeholder="Starts From" />
          </FormGroup>
          <FormGroup>
            <Label for="SubscriptionProgramme">Subscription Programme</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>Platinium Weekly Programme</option>
              <option>Diamond Weekly Programme</option>
              <option>Gold Weekly Programme</option>
              <option>Silver Weekly Programme</option>
              <option>Bronze Weekly Programme</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above input.
              It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Radio Buttons</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option one is this and that—be sure to include why it's great
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option two can be something else and selecting it will deselect option one
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" disabled />{' '}
                Option three is disabled
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      );
 }
export default AddNewSubscription;

