interface IJwtService {
  sign();
  signAsync();
  verify();
  verifyAsync();
}

export class MockedJwtService implements IJwtService {
  sign() {
    throw new Error('Method not implemented.');
  }
  signAsync() {
    throw new Error('Method not implemented.');
  }
  verify() {
    throw new Error('Method not implemented.');
  }
  verifyAsync() {
    throw new Error('Method not implemented.');
  }
}
