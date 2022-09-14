<template>
  <div class="cart container overflow-hidden">
    <div class="row">
      <div class="row">
        <div class="title mt-5">Shopping Cart</div>
      </div>
      <div class="row cart-content">
        <div class="col-md-8 cart-table table-responsive">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartItems?.length < 1">
                <th scope="row" colspan="4">
                  <div class="text-center">No item added, Add some!</div>
                </th>
              </tr>
              <tr v-for="item in cartItems" :key="item.id">
                <th scope="row" style="width: 400px">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-auto">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="item-image"
                        />
                      </div>
                      <div class="col-md-auto py-2">
                        <div class="">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div class="fw-bold">
                    ${{ numberWithCommasFormat2(item.price) }}
                  </div>
                </td>
                <td>
                  <CounterBox v-model="item.quantity" />
                </td>
                <td>
                  <div class="fw-bold">
                    ${{ numberWithCommasFormat2(item.price * item.quantity) }}
                  </div>
                </td>
                <td>
                  <div class="button-group">
                    <div class="button" @click="handleRemoveFromCart(item)">
                      <DeleteIcon />
                    </div>
                    <div class="button"><EditIcon /></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="container mb-3">
            <div class="row justify-content-between">
              <div class="col-auto">
                <div class="d-flex mb-3">
                  <BaseButton
                    color="#A2A6B0"
                    outline
                    width="200px"
                    style="margin-right: 8px"
                    @click="router.push({ name: 'Products' })"
                  >
                    Continue Shopping</BaseButton
                  >
                  <BaseButton
                    color="#ffffff"
                    width="200px"
                    background-color="#000000"
                    @click="clearCart()"
                  >
                    Clear Shopping Cart</BaseButton
                  >
                </div>
              </div>

              <div class="col-auto">
                <BaseButton
                  color="#ffffff"
                  width="200px"
                  background-color="#000000"
                  @click="router.push({ name: 'Products' })"
                >
                  Update Shopping Cart</BaseButton
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 cart-summary">
          <div class="container" style="padding: 0px">
            <div class="title fw-bold">Summary</div>
            <div class="collapse-block">
              <div
                class="collapse-triggerer"
                data-bs-toggle="collapse"
                data-bs-target="#shipping-form"
                aria-expanded="false"
                aria-controls="shipping-form"
              >
                <div class="name">
                  <span>Estimate Shipping and Tax</span
                  ><span><CounterUpArrow class="icon" /></span>
                </div>
                <div class="description">
                  Enter your destination to get a shipping estimate
                </div>
              </div>
              <div class="collapse-content collapse" id="shipping-form">
                <div class="mb-3">
                  <label for="country-input" class="form-label">Country</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="country-input"
                  >
                    <!-- <option selected>Open this select menu</option> -->
                    <option value="1">Australia</option>
                    <option value="2">Viet Nam</option>
                    <option value="3">America</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="state-input" class="form-label"
                    >State/Province</label
                  >
                  <input type="text" class="form-control" id="state-input" />
                </div>
                <div class="mb-3">
                  <label for="zip-input" class="form-label"
                    >Zip/Postal Code</label
                  >
                  <input type="text" class="form-control" id="zip-input" />
                </div>
                <label class="form-label" for="pickupOption1">
                  Standard Rate
                </label>
                <div class="form-check">
                  <div class="mb-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="pickupOption"
                      id="pickupOption1"
                      :value="PickupPrice.SHIP"
                      v-model="pickup"
                    />
                    <label class="form-check-label" for="pickupOption1">
                      Price may vary depending on the item/destination. Shop
                      Staff will contact you. $21.00
                    </label>
                  </div>
                </div>
                <label class="form-label"> Pickup from store </label>
                <div class="form-check">
                  <div class="mb-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="pickupOption"
                      id="pickupOption2"
                      checked
                      :value="PickupPrice.PICK"
                      v-model="pickup"
                    />
                    <label class="form-check-label" for="pickupOption2">
                      1234 Street Adress City Address, 1234 $0.00
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="collapse-block">
              <div
                class="collapse-triggerer"
                data-bs-toggle="collapse"
                data-bs-target="#discount-code-form"
                aria-expanded="false"
                aria-controls="discount-code-form"
              >
                <div class="name">
                  <span>Apply Discount Code</span
                  ><span><CounterUpArrow class="icon" /></span>
                </div>
              </div>
              <div class="collapse-content collapse" id="discount-code-form">
                <div class="mb-3">
                  <label for="discount-code-input" class="form-label"
                    >Enter discount code</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="discount-code-input"
                    placeholder="Enter Discount code"
                  />
                </div>
                <div class="mb-3">
                  <BaseButton
                    color="#0156FF"
                    background-color="transparent"
                    width="100%"
                    class="apply-btn"
                    outline
                  >
                    Apply Code
                  </BaseButton>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="receive-details row">
              <div class="d-flex justify-content-between detail">
                <div>Subtotal</div>
                <div>
                  ${{ numberWithCommasFormat2(store.getters.subtotal) }}
                </div>
              </div>
              <div class="d-flex detail-wrapper flex-column">
                <div class="d-flex justify-content-between detail">
                  <div>Shipping</div>
                  <div>${{ numberWithCommasFormat2(pickup) }}</div>
                </div>
                <div class="helper-text">
                  (Standard Rate - Price may vary depending on the
                  item/destination. TECS Staff will contact you.)
                </div>
              </div>

              <div class="d-flex justify-content-between detail">
                <div>Tax</div>
                <div>
                  ${{ numberWithCommasFormat2(store.getters.subtotal * 0.1) }}
                </div>
              </div>

              <div class="d-flex justify-content-between detail">
                <div>GST (10%)</div>
                <div>
                  ${{ numberWithCommasFormat2(store.getters.subtotal * 0.1) }}
                </div>
              </div>
              <div class="d-flex justify-content-between detail">
                <div>Order Total</div>
                <div style="font-size: 18px">
                  ${{
                    numberWithCommasFormat2(
                      store.getters.subtotal * 1.2 + pickup
                    )
                  }}
                </div>
              </div>
              <div class="d-flex">
                <BaseButton
                  color="white"
                  background-color="#0156FF"
                  width="100%"
                  class="checkout-btn"
                >
                  Proceed to Checkout
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CartItem } from "@/types";
import { numberWithCommasFormat2 } from "@/utils";
import { computed, ref, Ref } from "vue";
import { useStore } from "vuex";
import CounterBox from "@/components/CounterBox.vue";
import DeleteIcon from "@/assets/icons/outline-delete-icon.svg";
import EditIcon from "@/assets/icons/outline-edit-icon.svg";
import BaseButton from "../components/BaseButton.vue";
import CounterUpArrow from "@/assets/icons/counter-up-arrow.svg";
import { useRouter } from "vue-router";

const store = useStore();

const cartItems: Ref<CartItem[]> = computed(() => store.state.cartItems);
const handleRemoveFromCart = (item: CartItem) => {
  store.dispatch("removeFromCart", item.id);
};
enum PickupPrice {
  SHIP = 21,
  PICK = 0,
}

const pickup = ref(PickupPrice.PICK);
const router = useRouter();
const clearCart = () => {
  store.dispatch("clearCart");
};
</script>

<style lang="scss">
.cart {
  max-width: 1400px;
  padding-bottom: 60px;
  .title {
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 20px;
  }
  .cart-summary {
    background: #f5f7ff;
    min-height: 500px;
    padding: 17px 30px;
    .title {
      font-size: 24px;
      line-height: 36px;
    }
  }
  .cart-table {
    padding-right: 36px;
    thead th {
      padding-bottom: 13px;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
    }
    tbody tr {
      > * {
        padding: 25px 0px;
      }
      td > div {
        margin: 8px;
      }
    }
    .item-image {
      width: 120px;
      height: 120px;
    }

    tbody th {
      font-weight: 400;
    }

    .button-group {
      margin-top: 8px;
      > div {
        margin-bottom: 6px;
        cursor: pointer;
      }
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  button {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }
  .collapse-block {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .collapse-triggerer {
      cursor: pointer;
      .name {
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        color: #000000;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          transition: all 0.3s ease;
          path {
            stroke: #000000;
          }
        }
      }
      &.collapsed {
        .icon {
          transform: rotate(180deg);
        }
      }

      .description {
        font-size: 14px;
        line-height: 21px;
        color: #666666;
        width: 70%;
      }
    }

    .collapse-content {
      margin: 20px 0px;
    }
  }
  .divider {
    margin-top: 0px !important;
    width: 100%;
    border: 0px;
    border-bottom: 1px solid #cacdd8 !important;
  }

  .receive-details {
    padding: 10px 0px;
    color: #000000;
    .detail {
      font-weight: 600;
      font-size: 13px;
      margin: 18px 0px;
    }
    .detail-wrapper {
      .helper-text {
        width: 70%;
        font-size: 10px;
        color: #a2a6b0;
      }
    }
  }
  .checkout-btn,
  .apply-btn {
    padding: 16px !important;
  }

  .collapse-content {
    .form-label {
      font-weight: 600;
      color: #000000;
      font-size: 13px;
    }
    .form-check-label {
      color: #000000;
      font-size: 14px;
    }
    .form-select,
    .form-control {
      padding: 15px 17px;
      color: #000000;
      font-size: 14px;
    }
  }
}
</style>
