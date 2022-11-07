const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Payments", function(){

    let acc1
    let acc2
    let payments

    beforeEach(async function(){
        [acc1, acc2] = await ethers.getSigners()
        const Payments = await ethers.getContractFactory("Payments")
        payments  = await Payments.deploy()
        await payments.deployed()
        console.log(payments.address)
    })

    it("should be deployed", async function(){
        expect(payments.address).to.be.properAddress
    })

    it('shoud have 0 ther by default', async function(){
        const balance = await payments.currentBalance()
        expect(balance).to.eq(0)
    })

    it("should be possible to send funds", async function(){
        const sum = 100
        const message = "hello from hardhat"
        const tx = await payments.connect(acc2).pay(message, { value: sum})


        await expect(() => tx)
            .to.changeEtherBalances([acc2, payments], [-sum, sum]);

        await tx.wait()

        const newPayment = await payments.getPayment(acc2.address, 0)
        expect(newPayment.message).to.eq(message)
        expect(newPayment.amount).to.eq(sum)
        expect(newPayment.from).to.eq(acc2.address)
    })
})