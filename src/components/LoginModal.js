const LoginModal = () => {
    return (
      <div>
        <NavLink onClick={''} href="#">
          Login
        </NavLink>
        <Modal isOpen={'modal'} toggle={''}>
          <ModalHeader toggle={''}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={''}>
              <FormGroup>
                <Label>Email</Label>
                <Input />
                <Label>Password</Label>
                <Input />
                <Button color="dark">Login</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  };