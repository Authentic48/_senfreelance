import { Freelancer } from '../freelancer';

describe('', () => {
  it('implements optimistic concurrency control', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: '123654789',
    });

    await freelancer.save();

    const firstInstance = await Freelancer.findById(freelancer.id);
    const secondInstance = await Freelancer.findById(freelancer.id);

    firstInstance!.set({ phone: '12564480003' });
    secondInstance!.set({ phone: '879540036514798' });

    await firstInstance!.save();

    try {
      await secondInstance!.save();
    } catch (err) {
      return;
    }

    throw new Error('should not reach this point');
  });

  it('increments the version number on multitple saves', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: '123654789',
    });
    await freelancer.save();
    expect(freelancer.version).toEqual(0);
    await freelancer.save();
    expect(freelancer.version).toEqual(1);
    await freelancer.save();
    expect(freelancer.version).toEqual(2);
  });
});
